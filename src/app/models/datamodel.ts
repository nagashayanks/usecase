// tslint:disable-next-line: class-name
export interface company {
id: number;
value: string;
display: string;
}

// tslint:disable-next-line: class-name
export interface groupMessage {
groupId: number;
userName: string;
date: Date;
message: string;
}

// tslint:disable-next-line: class-name
export interface userGroup {
userId: number;
groupName: string;
groupId: number;
}

// tslint:disable-next-line: class-name
export interface user {
    name: string;
    email: string;
    password: string;
    id: number;
}
