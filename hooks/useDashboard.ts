import { useState, useEffect } from "react";

import useSWR from "swr";

import { DashboardSummaryResponse } from "../interfaces";

export const useDashboard = () => {
    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard',{
        refreshInterval: 30 * 1000 //30 seg
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn -1 : 30 );
        }, 1000)
      
        return () => clearInterval(interval)
    }, [])

    return {
        data,
        error,
        refreshIn
    }
}