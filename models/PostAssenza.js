class PostAssenza {
    constructor(id,data, giustifica, stato, tipologia, orario) {
        this.id = id,
        this.data = data;
        this.giustifica = giustifica;
        this.stato = stato;
        this.tipologia = tipologia; //a = assenza | r = ritardo | u = uscita_anticipata
        this.orario = orario; //orario ritardo
    }
}

export default PostAssenza;