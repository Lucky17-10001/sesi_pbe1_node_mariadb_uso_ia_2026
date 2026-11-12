const con = require('../db')

const cadastrar = (req, res) => {
    const { usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana } = req.body
    const sql = `INSERT INTO usoia
    (usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana)
    VALUES (?, ?, ?, ?, ?, ?, ?)`
    con.query(sql, [usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar uso de IA:', err)
            return res.status(500).json({ erro: 'Erro ao cadastrar uso de IA' })
        }

        res.status(201).json({
            mensagem: 'Uso de IA cadastrado com sucesso!',
            usoia: {
                id: result.insertId,
                usuarioId,
                sistema,
                tipo,
                finalidade,
                tecnologia,
                nivelRisco,
                revisaoHumana
            }
        })
    })
}

const listar = (req, res) => {
    const sql = 'SELECT * FROM usoia'

    con.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao listar usos de IA:', err)
            return res.status(500).json({ erro: 'Erro ao listar usos de IA' })
        }
        res.status(200).json(result)
    })
}

const buscarPorId = (req, res) => {
    const { id } = req.params
    const sql = 'SELECT id, usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana FROM usoia WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao buscar uso de IA:', err)
            return res.status(500).json({ erro: 'Erro ao buscar uso de IA' })
        }

        if (result.length === 0) {
            return res.status(404).json({ mensagem: 'Uso de IA não encontrado' })
        }

        res.status(200).json(result[0])
    })
}

const atualizar = (req, res) => {
    const { id } = req.params
    const { usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana } = req.body
    const sql = 'UPDATE usoia SET usuarioId = ?, sistema = ?, tipo = ?, finalidade = ?, tecnologia = ?, nivelRisco = ?, revisaoHumana = ? WHERE id = ?'
    con.query(sql, [usuarioId, sistema, tipo, finalidade, tecnologia, nivelRisco, revisaoHumana, id], (err, result) => {
        if (err) {
        console.error('Erro ao atualizar uso de IA:', err)
        return res.status(500).json({ erro: 'Erro ao atualizar uso de IA' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Uso de IA não encontrado' })
        }

        res.status(200).json({ mensagem: 'Uso de IA atualizado com sucesso!' })
    })
}

const excluir = (req, res) => {
    const { id } = req.params
    const sql = 'DELETE FROM usoia WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) {
        console.error('Erro ao excluir uso de IA:', err)
        return res.status(500).json({ erro: 'Erro ao excluir uso de IA' })
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Uso de IA não encontrado' })
        }

        res.status(200).json({ mensagem: 'Uso de IA excluído com sucesso!' })
    })
}

const resumoRiscos = (req, res) => {
    const sql = `SELECT nivelRisco, COUNT(*) AS total
    FROM usoia
    GROUP BY nivelRisco`

    con.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao gerar resumo de riscos:', err)
            return res.status(500).json({ erro: 'Erro ao gerar resumo de riscos' })
        }

        const resumo = {
            Baixo: 0,
            Medio: 0,
            Alto: 0
        }
        result.forEach((item) => {
            resumo[item.nivelRisco] = item.total
        })
        res.status(200).json(resumo)
    })
}

module.exports = {
    cadastrar,
    listar,
    buscarPorId,
    atualizar,
    excluir,
    resumoRiscos
}