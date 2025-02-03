
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

export async function tambahBarang(item, harga, jumlah) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "inventory"), {
      item: item,
      harga: harga,
      jumlah: jumlah
    })
    
        // menampilkan pesan berhasil
    console.log('berhasil menyimpan data barang')
  } catch (error) {
    // menampilkan pesan gagal 
    console.log('gagal menyimpan data barang' + error)
  }
}

export async function hapusBarang(id) {
  await deleteDoc(doc(basisdata, "inventory", id))
}

export async function ubahBarang(id, itembaru, hargabaru, jumlahbaru) {
  await updateDoc(
    doc(basisdata, "inventory", id), 
    { item: itembaru, harga: hargabaru, jumlah: jumlahbaru }
    )
}
  
export async function ambilBarang(id) {
  const refDokumen = await doc(basisdata, "inventory", id)
  const snapshotDokumen = await getDoc(refDokumen)

  return await snapshotDokumen.data()
}    