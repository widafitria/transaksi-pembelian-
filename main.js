
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDmI0zRauvzaL4oEuXinkmXhGiwTsYxYQc",
  authDomain: "insan-cemerlang-ee7af.firebaseapp.com",
  projectId: "insan-cemerlang-ee7af",
  storageBucket: "insan-cemerlang-ee7af.firebasestorage.app",
  messagingSenderId: "1047091827759",
  appId: "1:1047091827759:web:0f1742d6f3922f856de2da",
  measurementId: "G-GL8J5GC8XB"
};

//inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

 //fungsi ambil daftar barang
export async function ambilDaftarBarang() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      jumlah: dokumen.data().jumlah,
      harga: dokumen.data().harga
    })
  })

  return hasilKueri;
}

// menambah barang ke keranjang 
export async function tambahBarangKeKeranjang(
  idbarang,
  nama,
  harga,
  jumlah,
  idpelanggan,
  namapelanggan
  ) {
  try {
    // menyimpan data ke collection transaksi 
    const refDokumen = await addDoc(collection(basisdata, "transaksi"), {
      idbarang: idbarang,
      nama: nama,
      harga: harga,
      jumlah: jumlah,
      idpelanggan: idpelanggan,
      namapelanggan: namapelanggan
    })
    
    // menampilkan pesan berhasil 
    console.log("berhasil menyimpan keranjang")
  } catch (error) {
    // menampilkan pesan gagal 
    console.log(error)
  }
}

//menampilkan barang di keranjang 
export async function ambilDaftarBarangDiKeranjang() {
  const refDokumen = collection(basisdata, "transaksi");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);
  
  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      jumlah: dokumen.data().jumlah,
      harga: dokumen.data().harga
    })
  })

  return hasilKueri;
}
