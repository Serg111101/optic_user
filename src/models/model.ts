export interface IOrders {
    id: number;
    title: string;
    name: string;
    price: number;
    price1: number;
    img: string
}

export interface IUsps {
    id: number;
    title: string;
    name: string;
    price: number;
    price1: number;
    img: string
}

export interface IEmployees {
    id: number
    email: string
    picture:string
    name: string
    position: string
    surname: string
}
export interface ITasks {
    id: number,
    name:string
    tasks_name:string
    tasks_description: string
    tasks_id: string
    tasks_end: string
    tasks_start: string
    tasks_status:boolean
}
export interface ILoginStyle {
    buttonBg_color:  string
    created_at:string
    id: number
    loginBg_color:string
    login_color:string
    login_title:string
    password_title:string
    registration_title:string
    remember_title:string
    signIn_title:string
    signUp_title:string
    title:string
    updated_at:string
  };


