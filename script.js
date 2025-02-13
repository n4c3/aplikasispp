//MODAL BOX
var url = window.location.pathname.split('/');
url = url[2];
console.log(url);
var modal = document.getElementById("modalBox");

var modalConfirmDelete = document.getElementById("modalConfirmDelete");

var btn = document.getElementById("tampilModal");

var span = document.getElementsByClassName("close")[0];

var spanConfirm = document.getElementsByClassName("close")[1];


var form = [];
//ISI FORM
if (url == "kelas.php") {

    form[0] = document.getElementById("KodeKelas");
    form[1] = document.getElementById("NamaKelas");
    form[2] = document.getElementById("KodeSPP");
    form[3] = document.getElementById("Jurusan");

} else if (url == "siswa.php") {

    form[0] = document.getElementById("hiddenNis");
    form[1] = document.getElementById("nis");
    form[2] = document.getElementById("nama");
    form[3] = document.getElementById("alamat");
    form[4] = document.getElementById("telp");

} else if (url == "petugas.php") {

    form[0] = document.getElementById("id");
    form[1] = document.getElementById("NamaPetugas");
    form[2] = document.getElementById("Username");
    form[3] = document.getElementById("Alamat");
    form[4] = document.getElementById("Telp");
    form[5] = document.getElementById("Jabatan");
    form[6] = document.getElementById("kodepetugas");

} else if (url == "spp.php") {

    form[0] = document.getElementById("KodeSPP");
    form[1] = document.getElementById("TahunAjaran");
    form[2] = document.getElementById("Tingkat");
    form[3] = document.getElementById("BesarBayaran");

}

span.onclick = function () {
    modal.style.display = "none";
}
if (spanConfirm) {
    spanConfirm.onclick = function () {
        modalConfirmDelete.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == modalConfirmDelete) {
        modalConfirmDelete.style.display = "none";
    }
}

//BAGIAN MODAL TAMBAH DATA
btn.onclick = function () {
    var tambahUrl = "tambah" + url;
    var modalTitle = "Tambah Data";
    if (url == "sppsiswa.php") {
        modalTitle = "Tambah Siswa";
    }
    tampilModal(modalTitle, tambahUrl, "Simpan");
    //COPYRIGHT © DAVID RESANT0
    for (let i = 0; i < form.length; i++) {
        var element = form[i];
        element.readOnly = false;
        if (element.tagName == "SELECT") {
            element.selectedIndex = 0;
            continue;
        }
        element.value = "";
    }
}

//CHANGE MODAL TITLE, TOMBOL SUBMIT, AND ACTION FORM
function tampilModal(judul, action, tombol_aksi) {
    modal.style.display = "block";
    document.getElementById("modal-title").innerHTML = judul;
    document.getElementById("formModal").action = action;
    document.getElementById("tombolAksi").innerHTML = tombol_aksi
}

//AJAX EDIT KELAS
function editKelas(str) {
    tampilModal("Edit Data Kelas", "edit" + url, 'Edit');
    if (str == "") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj)
            form[0].value = obj.KodeKelas;
            form[1].value = obj.NamaKelas;
            form[2].value = obj.KodeSPP;
            form[3].value = obj.Jurusan;
        }
    }
    xmlhttp.open("GET", "getkelas.php?kodekelas=" + str, true);
    xmlhttp.send();
}
//DELETE Kelas 
function deleteKelas(namakelas, kodekelas) {
    if (confirm("Yakin ingin hapus data kelas " + namakelas + "?")) {
        location.href = "deletekelas.php?id=" + kodekelas;
    }
}

//AJAX EDIT SISWA
function editSiswa(str) {
    tampilModal("Edit Data " + str, "edit" + url, 'Edit');
    if (str == "") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            form[0].value = obj.NIS;
            form[1].value = obj.NIS;
            form[2].value = obj.NamaSiswa;
            form[3].value = obj.Alamat;
            form[4].value = obj.NoTelp;
        }
    }
    xmlhttp.open("GET", "getsiswa.php?nis=" + str, true);
    xmlhttp.send();
}
//DELETE SISWA 
function deleteSiswa(nis) {
    // if(confirm("Yakin ingin hapus data siswa "+nis+"?\nPERHATIAN : Ini juga akan menghapus spp siswa tersebut.")){
    //   location.href="deletesiswa.php?id="+nis;
    // }
    document.getElementById("deleteNis").value = nis;
    modalConfirmDelete.style.display = "block";
    document.getElementById("textConfirmDelete").innerHTML = "Yakin ingin hapus data NIS " + nis + "?";
}

//AJAX EDIT PETUGAS
function editPetugas(str) {
    tampilModal("Edit Data Petugas", "edit" + url, 'Edit');
    if (str == "") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    console.log(str);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            form[0].value = obj.KodePetugas;
            form[1].value = obj.NamaPetugas;
            form[2].value = obj.Username;
            form[3].value = obj.Alamat;
            form[4].value = obj.Telp;
            form[5].value = obj.Jabatan;
            form[6].value = obj.KodePetugas;
        }
    }
    xmlhttp.open("GET", "getpetugas.php?kodepetugas=" + str, true);
    xmlhttp.send();
}
//DELETE PETUGAS 
function deletePetugas(petugas) {
    var nama = document.getElementById("nama" + petugas).textContent;
    if (confirm("Yakin ingin hapus data " + nama + "?")) {
        location.href = "deletepetugas.php?id=" + petugas;
    }
}

//AJAX EDIT SPP
function editSpp(str) {
    tampilModal("Edit Data SPP " + str, "edit" + url, 'Edit');
    if (str == "") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    }
    console.log(str);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            console.log(obj);
            form[0].value = obj.KodeSPP;
            form[1].value = obj.TahunAjaran;
            form[2].value = obj.Tingkat;
            form[3].value = obj.BesarBayaran;
        }
    }
    xmlhttp.open("GET", "getspp.php?kodespp=" + str, true);
    xmlhttp.send();
}
//DELETE SPP 
function deleteSpp(spp) {
    if (confirm("Yakin ingin hapus data spp dengan kode SPP : " + spp + "?")) {
        location.href = "deletespp.php?id=" + spp;
    }
}

