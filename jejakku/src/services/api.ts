import { DataCuaca, ResponCuacaEksternal } from '../types/api';

const KOORDINAT_MALANG = {
  latitude: -7.98,
  longitude: 112.63,
};

function terjemahkanKodeCuaca(kode: number): string {
  if (kode === 0) return 'Cerah';
  if (kode >= 1 && kode <= 3) return 'Cerah Berawan';
  if (kode >= 45 && kode <= 48) return 'Berkabut';
  if (kode >= 51 && kode <= 67) return 'Hujan Ringan';
  if (kode >= 71 && kode <= 77) return 'Bersalju';
  if (kode >= 80 && kode <= 82) return 'Hujan Lebat';
  if (kode >= 95) return 'Badai Petir';
  return 'Berawan';
}

export function mintaCuacaDenganTimeout(
  batasWaktuMilidetik = 6000
): Promise<DataCuaca> {
  return new Promise<DataCuaca>((resolve, reject) => {
    const penandaWaktu = setTimeout(() => {
      reject(new Error('Koneksi timeout: Gagal mengambil data cuaca dari server.'));
    }, batasWaktuMilidetik);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${KOORDINAT_MALANG.latitude}&longitude=${KOORDINAT_MALANG.longitude}&current_weather=true`;

    fetch(url)
      .then((responHttp) => {
        if (!responHttp.ok) {
          throw new Error(`Gagal menghubungi server (Status: ${responHttp.status})`);
        }
        return responHttp.json() as Promise<ResponCuacaEksternal>;
      })
      .then((dataEksternal) => {
        clearTimeout(penandaWaktu);

        const hasil: DataCuaca = {
          kota: 'Malang (UMM)',
          suhu: Math.round(dataEksternal.current_weather.temperature),
          kecepatanAngin: Math.round(dataEksternal.current_weather.windspeed),
          kondisi: terjemahkanKodeCuaca(dataEksternal.current_weather.weathercode),
          waktuPembaruan: dataEksternal.current_weather.time,
        };

        resolve(hasil);
      })
      .catch((kesalahan) => {
        clearTimeout(penandaWaktu);
        reject(kesalahan instanceof Error ? kesalahan : new Error('Terjadi kesalahan jaringan'));
      });
  });
}

export async function ambilDataCuacaLive(): Promise<DataCuaca> {
  const data = await mintaCuacaDenganTimeout();
  return data;
}

