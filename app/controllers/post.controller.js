const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;

//*create table
exports.create = (req, res) =>{
    //* validasi
    if(!req.body.title){
        res.status(400).send({
            message: "Konten Tidak Boleh Kosong"
        })

        return;
    }
    
    //*create Post
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    Post.create(post)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message:
                err.message || "Error Ketika Membuat tabel Post"
            })
        });

};


//*select * from nama tabel
exports.findAll = (req, res) =>{
    const title = req.query.title;
    let condition = title ? { title: {[Op.like]: `%${title}%`} } : null;

    Post.findAll({where : condition})
    .then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
            err.message || "Data Tidak Ditemukan"
        })
    })
}
//*select * from nama tabel where id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Post.findByPk(id)
    .then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message:
            err.message || "Data Tidak Ditemukan Dengan Id=" +id
        })
    })
}
//*update set nama tabel by id
exports.update = (req, res) =>{
    const id = req.params.id;
    Post.update(req.body, {
        where: { id: id }
    }).then((data) => {
        if(data == 1){
            res.send({
                message: "Post Telah Berhasil Di Update"
            })
        }else{
            res.send({
                message: `Post Gagal Di Update dengan id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error Update Gagal Dengan Id=" +id
        })
    })
}
//*delete from nama tabel by id
exports.delete = (req, res) =>{
    const id = req.params.id;
    Post.destroy({
        where: {id: id}
    }).then((data) => {
        if(data == 1){
            res.send({
                message: "Post Berhasil Dihapus"
            })
        }else{
            res.send({
                message: `Post Gagal Dihapus Dengan id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error!! Post Gagal Dihapus Dengan Id=" +id
        })
    })
}
//*delete from nama tabel(semua)
exports.deleteAll = (req, res) => {
    Post.destroy({
        where:{},
        truncate: false //Kalau True Saat setelah di hapus, id kembali ke 1, kalau false id melanjutkan dari data yang setelah dihapus
    }).then((data) => {
        res.send({
            message: `${data} Post Berhasil Di Hapus`
        })
    }).catch((err) => {
        res.status(500).send ({
            message: err.message || "Sesuatu Error Saat Akan Menghapus Post"
        })
    })
    
}
//*select * from nama tabel where published
exports.findAllPublished = (req, res) => {
    Post.findAll({
        where: { published: true }
    })
    .then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({
            message:
            err.message || "Data Tidak Ditemukan"
        })
    })
}