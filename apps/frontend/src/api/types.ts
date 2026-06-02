export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface TokenData {
  access_token: string;
  token_type: "Bearer";
}

export interface User {
  id: number;
  username: string;
  is_active: boolean;
  created_at: string;
}
