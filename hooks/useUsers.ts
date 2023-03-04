import { useState, useEffect } from "react";
import useSWR from "swr";
import { tesloApi } from "../api";
import { IUser } from "../interfaces";


export const useUsers = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [ users, setUsers ] = useState<IUser[]>([]);

    useEffect(() => { //Esto lo hacemos para que cada que cambie la data el useEffect se ejecute y llene de nuevo el estado con el update
        //Esto evita que el usuario tenga que recargar la página para ver los cambios
      if( data ) {
        setUsers(data)
      }
    }, [data])

    const onRoleUpdate = async( userId: string, newRole: string ) => {

        const previousUsers = users.map( user => ({ ...user }) ); //Copia de la información antes del cambio por si hay un error
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }) );

        setUsers(updatedUsers);

        try {
            await tesloApi.put('/admin/users', { userId, role: newRole }) //Esos dos parametros ya que es lo que pide el API
        } catch (error) {
            setUsers(previousUsers);
            console.log(error);
            alert('No se pudo actualizar el role del usuario')
        } 

    }

    return {
        data, 
        error,
        users,

        //Methods
        onRoleUpdate
    }

}