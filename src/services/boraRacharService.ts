
import { fetchClient } from "./api";
import type {
    CreateGroupDto,
    CreatedGroupResponseDto,
    GroupResponseDto,
    CreateExpenseDto,
    UpdateExpenseDto,
    ExpenseResponseDto,
    MemberBalanceResponseDto,
    PaymentInstruction,
} from "./types/types";

export const boraRacharService = {

  createGroup: (data: CreateGroupDto) => 
    fetchClient<CreatedGroupResponseDto>('/api/groups', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getGroup: (groupId: string, token: string) => 
    fetchClient<GroupResponseDto>(`/api/groups/${groupId}`, {}, token),

  createExpense: (groupId: string, data: CreateExpenseDto, token: string) =>
    fetchClient<ExpenseResponseDto>(`/api/groups/${groupId}/expenses`, {
      method: 'POST',
      body: JSON.stringify(data),
    }, token),

  getExpenses: (groupId: string, token: string, page = 1, pageSize = 50) =>
    fetchClient<ExpenseResponseDto[]>(
      `/api/groups/${groupId}/expenses?page=${page}&pageSize=${pageSize}`,
      {},
      token
    ),

  getExpenseById: (groupId: string, expenseId: string, token: string) =>
    fetchClient<ExpenseResponseDto>(`/api/groups/${groupId}/expenses/${expenseId}`, {}, token),

  updateExpense: (groupId: string, expenseId: string, data: UpdateExpenseDto, token: string) =>
    fetchClient<ExpenseResponseDto>(`/api/groups/${groupId}/expenses/${expenseId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }, token),

  deleteExpense: (groupId: string, expenseId: string, version: number, token: string) =>
    fetchClient<void>(`/api/groups/${groupId}/expenses/${expenseId}?version=${version}`, {
      method: 'DELETE',
    }, token),

  getBalances: (groupId: string, token: string) =>
    fetchClient<MemberBalanceResponseDto[]>(`/api/groups/${groupId}/balances`, {}, token),

  getSettlements: (groupId: string, token: string) =>
    fetchClient<PaymentInstruction[]>(`/api/groups/${groupId}/settlements`, {}, token),
};