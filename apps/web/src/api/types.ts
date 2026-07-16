import type { components } from "@/api/generated/schema";

export type LoginRequest = components["schemas"]["LoginRequest"];
export type RegisterRequest = components["schemas"]["RegisterRequest"];
export type TokenData = components["schemas"]["TokenData"];
export type User = components["schemas"]["UserOut"];
export type LoginResponse = components["schemas"]["ApiResponse_TokenData_"];
export type UserResponse = components["schemas"]["ApiResponse_UserOut_"];
