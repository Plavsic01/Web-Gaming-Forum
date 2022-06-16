import service from "../services/service.js"

export default{
    data(){
        return {
            decodedToken:((localStorage.getItem('token')) ? JSON.parse(atob(localStorage.getItem('token').split(".")[1]))['sub']:null),
        }
    },
    methods:{
        odjava(){
            service.logout();
        }
    },
    template:`
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">Gaming Forum</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <template v-if="decodedToken">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Kreiraj
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <template v-for="prava in decodedToken.prava_pristupa">
                    <li v-if="prava == 'administrator'">
                    <router-link class="nav-link" to="/forma-korisnik">Korisnik</router-link>
                      <router-link class="nav-link" to="/forma-podforumi">PodForumi</router-link>                      
                    </li>
                  </template>
                  <li><router-link class="nav-link" to="/forma-teme">Teme</router-link></li>
                  <li><router-link class="nav-link" to="/forma-objave">Objave</router-link></li>
                  <li><router-link class="nav-link" to="/forma-komentari">Komentari</router-link></li>
                </ul>
              </li>

            <template v-for="prava in decodedToken.prava_pristupa">
            <li class="nav-item" v-if="prava == 'administrator'">  
                <router-link class="nav-link" to="/korisnici">Korisnici</router-link>
            </li>
            <li class="nav-item" v-if="prava == 'korisnik'">  
                <router-link class="nav-link" to="/korisnik">Moj Profil</router-link>
            </li>
            </template>

            
            
              <li class="nav-item">
                <a class="nav-link" @click="odjava">Odjava</a>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/prijava">Prijava</router-link>
            </li>
            <li>
        <router-link class="nav-link" to="/registracija">Registracija</router-link>
        </li>
        </ul>
      </div>
    </template>
        </div>
      </nav>


      
    `
}