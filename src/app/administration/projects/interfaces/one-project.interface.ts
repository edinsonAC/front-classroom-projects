// Generated by https://quicktype.io

export interface OneProjectInterface {
    status:    number;
    statusMsg: string;
    data:      DataProject;
}

export interface DataProject {
    id:                 string;
    created_at:         string;
    updated_at:         string;
    name:               string;
    description:        string;
    active:             boolean;
    state:              string;
    number_of_students: number;
    registeredPersons:  number;
    full:               boolean;
}
