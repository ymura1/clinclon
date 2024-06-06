export interface UserInterface {
  first_name?: string | null;
  last_name?: string | null;
  user_name?: string;
  rate?: number;
  rate_type?: string | null;
  status?: string;
  shifts?: [
    {
      day: 'string';
      start_time: string;
      end_time: string;
    },
  ];
}


export interface RawUserInterface {
  first_name: string | null;
  last_name: string | null;
  user_name: string;
  rate: number;
  rate_type: string | null;
  status: string;
  day: string | null;
  start_time: string | null;
  end_time: string | null;
}