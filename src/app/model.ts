export interface User {
  user_id: number;
  user_name: string;
  password: string;
  expire_status: Status;
  full_name: string;
  status: Status;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
  address: string;
  modified_password: Date|undefined;
  locked_date: Date|undefined;
  failure_count: number;
  created_id: number;
  deleted_id: number|undefined;
  modified_id: number|undefined;
  config: string;
}

export interface Group {
  group_id: number;
  name: string;
  description: string|undefined;
  status: Status;
  parent_id: number;
}

export interface GroupUser {
  id: number;
  group_id: number;
  user_id: number;
}

export interface NonEmptyBrand {
  readonly NonEmptyString: unique symbol;
}

export type NonEmptyString = string & NonEmptyBrand;

function isNonEmptyString(str: string): str is NonEmptyString {
  return str.length > 0;
}


export type Status = 0 | 1 | 2;
