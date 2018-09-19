#Private List

- Implementaria una autenticacion al momento de entrar en la pagina.
- En el modelo de la List pondria otro parametro que seria el Id del owner que ha hecho el post y una propriedad boolean, que podemos llamar private.
´´´
const ListItem = new Schema({
  list: [{ type: Schema.Types.ObjectId, ref: 'Lists' }],
  text: String,
  done: { type: Boolean, default: false },
  owner: ObjectId,
  private: Boolean,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
´´´
- Cuando un usuario crea una card tiene la opción de poner private con un checkbox.
- En react al momento de mostrar la card habría una condicion que si una card es privada para mostrarse el usuario logeado tiene que ser el mismo que ha hecho la publicación 
