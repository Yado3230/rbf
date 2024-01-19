import { ReactElement } from "react";

export interface SideBarItem {
  name: string;
  label: string;
  icon: ReactElement;
  hide: boolean; // set the hidden value to true if you want to. U can use different var for different purposes.
  path: string;
  active: string;
}

export interface MenuItem {
  title: string;
  url: string;
  active: boolean;
}

export interface Login {
  username: string;
  password: string;
}

export interface CapTableResponse {
  id: number;
  month: string;
  fixedRevenueShareRate: string;
  variableRevenueShareRate: string;
  createdDate: Date;
}

export interface CapTableRequest {
  month: string;
  fixedRevenueShareRate: string;
  variableRevenueShareRate: string;
}

export interface RevenueDriverResponse {
  id: number;
  description: string;
  endingMonth: string;
  growthRate: string;
  createdDate: Date;
}

export interface RevenueDriverRequest {
  description: string;
  endingMonth: string;
  growthRate: string;
}

export interface RevenueShareDriverResponse {
  id: number;
  description: string;
  type: string;
  receiptsRate: string;
  createdDate: Date;
  variableTypePhase: number;
  months: number;
}

export interface RevenueShareDriverRequest {
  description: string;
  type: string;
  receiptsRate: string;
  variableTypePhase: number;
  months: number;
}

export interface RevenueProjectionTypeRequest {
  type: string;
}

export interface RevenueProjectionTypeResponse {
  id: number;
  type: string;
  createdDate: Date;
}

export interface RevenueShareTypeResponse {
  id: number;
  type: string;
  createdDate: Date;
}

export interface RevenueShareTypeRequest {
  type: string;
}

export interface RiskResponse {
  id: number;
  type: string;
  percentage: string;
  createdDate: Date;
}

export interface RiskRequest {
  type: string;
}

export interface CohortRequest {
  name: string;
  description: string;
  maxFacilityTerm: string;
  payoffMonthId: number;
  revenueProjectionTypeId: number;
  revenueShareTypeId: number;
}

export interface CohortResponse {
  id: number;
  name: string;
  description: string;
  maxFacilityTerm: string;
  payoffMonth: CapTableResponse;
  revenueProjectionType: RevenueProjectionTypeResponse;
  revenueShareType: RevenueShareTypeResponse;
  createdDate: Date;
  updatedAt: Date;
}

export interface CohortType {
  id: number;
  name: string;
  description: string;
  maxFacilityTerm: string;
  payoffMonth: string;
  revenueProjectionType: string;
  revenueShareType: string;
  createdDate: Date;
  updatedAt: Date;
}
