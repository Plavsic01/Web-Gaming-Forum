import service from "../../services/service.js"

export default{
    data(){
        return {
            podaci:{},
            prijavljen:false
        }
    },
    created(){
        if(localStorage.getItem("token")){
            this.prijavljen = true;
        }
    },
    methods:{
       login(){
           service.login(this.podaci)           
       }
    },

    
    template:`
    <br>
    
    <template v-if="prijavljen">
        <h2 style="text-align:center">Korisnik Već Prijavljen!</h2>
    </template>

    <template v-else>
    <section>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <h3 class="mb-5">Prijava</h3>

            <form v-on:submit.prevent="login()">

            <div class="form-outline mb-4">
              <input type="text" v-model="podaci.korisnicko_ime" id="username" class="form-control form-control-lg" required />
              <label class="form-label" for="username">Korisnicko Ime</label>
            </div>

            <div class="form-outline mb-4">
              <input v-model="podaci.lozinka" type="password" id="password" class="form-control form-control-lg" required/>
              <label class="form-label" for="password">Lozinka</label>
            </div>

            <button class="btn btn-primary btn-lg btn-block" type="submit">Login</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

    
    `
}


{/* <template v-if="prijavljen">
        <p>Korisnik Uspesno Prijavljen!</p>
    </template>

    <template v-else>
    <form v-on:submit.prevent="login()">
    
        <label>Korisnicko Ime</label>
        <input v-model="podaci.korisnicko_ime" type=text>
        <label>Lozinka</label>
        <input v-model="podaci.lozinka" type=password>

    <button class="btn btn-outline-success m-1" type="submit">Login</button>
    </form>
    </template> */}
