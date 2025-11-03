import { services } from "@core/lib/api";
import { overridable } from "@core/lib/overridable";
import { useLoaderAsync } from "@core/lib/useLoader";
import { IOrder } from "@store-shared/order/types";
import { useEffect, useState } from "react";
import { createInjector, inject, mergeProps } from "unstateless";
import { SalesReportComponent } from "./SalesReport.component";
import { ISalesReportInputProps, ISalesReportProps, SalesReportProps } from "./SalesReport.d";

const injectSalesReportProps = createInjector(({}:ISalesReportInputProps):ISalesReportProps => {
    const [data, setData] = useState<IOrder[]>([]);
    const [salesByDate, setSalesByDate] = useState<Record<string, IOrder[]>>({});
    const [salesByWeek, setSalesByWeek] = useState<Record<string, IOrder[]>>({});
    const [salesByMonth, setSalesByMonth] = useState<Record<string, IOrder[]>>({});
    const loader = useLoaderAsync();

    const refresh = () => {
        loader(() => services().report.sales()
            .then(orders => {
                // Sort by date descending
                const sortedOrders = orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setData(sortedOrders);

                // Group by date
                const groupedByDate: Record<string, IOrder[]> = {};
                const groupedByWeek: Record<string, IOrder[]> = {};
                const groupedByMonth: Record<string, IOrder[]> = {};
                sortedOrders.forEach(order => {
                    const date = new Date(order.createdAt);

                    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD

                    const weekStart = new Date(date);
                    weekStart.setDate(date.getDate() - date.getDay()); // Set to start of the week (Sunday)
                    const weekKey = `${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`; // YYYY-MM-DD

                    const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM

                    if (!groupedByDate[dateKey]) {
                        groupedByDate[dateKey] = [];
                    }
                    groupedByDate[dateKey].push(order);

                    if (!groupedByWeek[weekKey]) {
                        groupedByWeek[weekKey] = [];
                    }
                    groupedByWeek[weekKey].push(order);

                    if (!groupedByMonth[monthKey]) {
                        groupedByMonth[monthKey] = [];
                    }
                    groupedByMonth[monthKey].push(order);
                });
                setSalesByDate(groupedByDate);
                setSalesByWeek(groupedByWeek);
                setSalesByMonth(groupedByMonth);
            })
        );
    }

    useEffect(refresh, []);
    
    return {data, salesByDate, salesByWeek, salesByMonth, isLoading: loader.isLoading, refresh};
});

const connect = inject<ISalesReportInputProps, SalesReportProps>(mergeProps(
    injectSalesReportProps,
));

export const SalesReport = overridable<ISalesReportInputProps>(connect(SalesReportComponent));
