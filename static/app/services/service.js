export default{
    findAll(url){
        return axios.get(url,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    findOne(url,id){
        return axios.get(`${url}/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    create(url,data){
        return axios.post(`${url}`,data,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        });
    },
    update(url,id,data){
        return axios.put(`${url}/${id}`,data,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    },
    delete(url,id){
        return axios.delete(`${url}/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
    },
    login(korisnik){
        axios.post('/prijava',korisnik).then(response=>{
            localStorage.setItem("token",response.data['access_token'])
            location.replace("http://127.0.0.1:5000/#/");
            location.reload();
        }).catch(err=>{
            window.alert("Pogresno korisnicko ime i/ili lozinka!");
        })
        
    },
    logout(){
        localStorage.clear();
        location.replace("http://127.0.0.1:5000/#/prijava");
        location.reload();
    },
    registracija(korisnik){
        axios.post('/registracija',korisnik).then(response=>{
            location.replace("http://127.0.0.1:5000/#/prijava");
        }).catch(err=>{
            window.alert("Vec postoji korisnik!");
        })
    }
}