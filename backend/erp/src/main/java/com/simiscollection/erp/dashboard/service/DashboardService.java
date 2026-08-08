package com.simiscollection.erp.dashboard.service;

import com.simiscollection.erp.dashboard.dto.DashboardSummaryResponse;
import com.simiscollection.erp.dashboard.dto.MonthlyChartDTO;

import java.util.List;

public interface DashboardService {

    DashboardSummaryResponse getDashboardSummary();

    List<MonthlyChartDTO> getMonthlySales();

    List<MonthlyChartDTO> getMonthlyPurchases();
}