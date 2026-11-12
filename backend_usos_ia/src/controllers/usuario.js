const con = require('../db')

const cadastrar = (req, res) => {
    const { nome, email, senha } = req.body
    const sql = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, PASSWORD(?))'

    con.query(sql, [nome, email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err)
            return res.status(500).json({ erro: 'Erro ao cadastrar usuário' })
        }

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario: {
                id: result.insertId,
                nome,
                email
            }
        })
    })
}

const listar = (req, res) => {
    const sql = 'SELECT id, nome, email FROM usuario'

    con.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao listar usuários:', err)
            return res.status(500).json({ erro: 'Erro ao listar usuários' })
        }

        res.status(200).json(result)
    })
}

const buscarPorId = (req, res) => {
    const { id } = req.params
    const sql = 'SELECT id, nome, email FROM usuario WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err)
            return res.status(500).json({ erro: 'Erro ao buscar usuário' })
        }

        if (result.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        res.status(200).json(result[0])
    })
}

const atualizar = (req, res) => {
    const { id } = req.params
    const { nome, email, senha } = req.body
    const sql = 'UPDATE usuario SET nome = ?, email = ?, senha = PASSWORD(?) WHERE id = ?'
    con.query(sql, [nome, email, senha, id], (err, result) => {
        if (err) {
        console.error('Erro ao atualizar usuário:', err)
        return res.status(500).json({ erro: 'Erro ao atualizar usuário' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' })
    })
}

const excluir = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM usuario WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) {
        console.error('Erro ao excluir usuário:', err)
        return res.status(500).json({ erro: 'Erro ao excluir usuário' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' })
        }

        res.status(200).json({ mensagem: 'Usuário excluído com sucesso!' })
    })
}

const login = (req, res) => {
    const { email, senha } = req.body
    const sql = 'SELECT id, nome, email FROM usuario WHERE email = ? AND senha = PASSWORD(?)'
    con.query(sql, [email, senha], (err, result) => {
        if (err) {
            console.error('Erro ao fazer login:', err)
            return res.status(500).json({ erro: 'Erro ao fazer login' })
        }

        if (result.length === 0) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas' })
        }

        res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            usuario: result[0]
        })
    })
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir,
    login
}