export interface ResponCuacaEksternal {
  latitude: number;
  longitude: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    is_day: number;
    time: string;
  };
}

export interface DataCuaca {
  kota: string;
  suhu: number;
  kecepatanAngin: number;
  kondisi: string;
  waktuPembaruan: string;
}

