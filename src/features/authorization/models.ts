export type UserRoleType = "ROLE_USER" | "ROLE_ADMIN" | "ROLE_SUPER_USER";

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: Array<UserRoleType>;
}