
import login from "./components/Autentikacija/login.js";
import registracija from "./components/Autentikacija/registracija.js";

import navbar from "./components/navbar.js";

import pocetnaStranica from "./components/pocetnaStranica.js";

import formaTema from "./components/Tema/formaTema.js";
import prikazTema from "./components/Tema/prikazTema.js";

import prikazObjava from "./components/Objava/prikazObjava.js";
import formaObjava from "./components/Objava/formaObjava.js";

import prikazTrenutnogKorisnika from "./components/Korisnik/prikazTrenutnogKorisnika.js";

import prikazKorisnika from "./components/Korisnik/prikazKorisnika.js";
import formaKorisnika from "./components/Korisnik/formaKorisnika.js";

import prikazPodForum from "./components/PodForum/prikazPodForum.js";
import formaPodForum from "./components/PodForum/formaPodForum.js";

import prikazKomentar from "./components/Komentar/prikazKomentar.js";
import formaKomentar from "./components/Komentar/formaKomentar.js";

import generickaTabela from "./components/generickaTabela.js";
import generickaForma from "./components/generickaForma.js";


const routes = [
    {path:'/',component:pocetnaStranica,name:"pocetna_stranica"},
    {path:'/prijava',component:login,name:"prijava_forma"},
    {path:'/registracija',component:registracija,name:"registracija_forma"},
    {path:'/forma-korisnik',component:formaKorisnika},
    {path:'/forma-teme',component:formaTema},
    {path:'/forma-objave',component:formaObjava},
    {path:'/forma-komentari',component:formaKomentar},
    {path:'/forma-podforumi',component:formaPodForum},


    {path:'/pod-forumi',component:prikazPodForum},
    {path:'/korisnici',component:prikazKorisnika},
    {path:'/korisnik',component:prikazTrenutnogKorisnika},
    



    {path:'/forma-korisnik/:id',component:formaKorisnika,name:"forma_korisnika"},
    {path:'/forma-pod-forum/:id',component:formaPodForum,name:"forma_podforum"},
    {path:'/forma-tema/:id',component:formaTema,name:"forma_tema"},
    {path:'/forma-objava/:id',component:formaObjava,name:"forma_objava"},
    {path:'/forma-komentar/:id',component:formaKomentar,name:"forma_komentar"},
    {path:'/pod-forum/:id',component:prikazTema,name:"prikaz_tema"},
    {path:'/tema/:id',component:prikazObjava,name:"prikaz_objava"},
    {path:'/objava/:id',component:prikazKomentar,name:"prikaz_komentar"},
    

]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

const app = Vue.createApp({

    data(){
        return {}
    },

})


app.use(router);



app.component("pocetna-stranica",pocetnaStranica);

app.component("prikaz-tema",prikazTema);
app.component("forma-tema",formaTema);

app.component("prikaz-korisnika",prikazKorisnika);
app.component("forma-korisnika",formaKorisnika);


app.component("prikaz-podforum",prikazPodForum);
app.component("forma-podforum",formaPodForum);


app.component("genericka-tabela",generickaTabela);
app.component("genericka-forma",generickaForma);


app.component("prikaz-objava",prikazObjava);
app.component("forma-objava",formaObjava);


app.component("prikaz-komentar",prikazKomentar);
app.component("forma-komentar",formaKomentar);



app.component("prikaz-trenutnog-korisnika",prikazTrenutnogKorisnika);



app.component("login",login);
app.component("registracija",registracija);

app.component("navbar",navbar);


app.mount("#app");
