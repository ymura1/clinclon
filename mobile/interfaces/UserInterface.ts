export interface UserInterface {
  first_name: string;
  last_name: string;
  email_address: string;
  rate: number;
  rate_type: string;
  status: string;
  shifts?: [
    {
      day: string;
      start_time: string;
      end_time: string;
    },
  ];
}


export interface RawUserInterface {
  first_name: string;
  last_name: string;
  rate: number;
  email_address: string;
  rate_type: string | null;
  status: string;
  day: string | null;
  start_time: string | null;
  end_time: string | null;
}