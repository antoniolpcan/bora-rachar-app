export interface CreateGroupDto {
  name: string;
  members: string[];
}

export interface MemberResponseDto {
  id: string;
  name: string;
}

export interface CreatedGroupResponseDto {
  id: string;
  name: string;
  members: MemberResponseDto[];
  accessToken: string;
}

export interface GroupResponseDto {
  id: string;
  name: string;
  members: MemberResponseDto[];
}

export interface CreateExpenseDto {
  title: string;
  amount: number;
  paidByMemberId: string;
  splitAmongMemberIds: string[];
}

export interface UpdateExpenseDto extends CreateExpenseDto {
  version: number;
}

export interface ExpenseResponseDto {
  id: string;
  title: string;
  amount: number;
  paidByMemberId: string;
  splitAmongMemberIds: string[];
  createdAt: string;
  version: number;
}

export interface MemberBalanceResponseDto {
  memberId: string;
  memberName: string;
  totalPaid: number;
  totalShare: number;
  balance: number;
}

export interface PaymentInstruction {
  fromMemberId: string;
  toMemberId: string;
  amount: number;
}