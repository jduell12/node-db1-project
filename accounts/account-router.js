const express = require('express')
const db = require('../data/dbConfig')
const router = express.Router()

router.get('/', (req, res) => {
  db('accounts')
    .select('*')
    .then(accounts => {
      res.status(200).json({ data: accounts })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: err.message })
    })
})

router.get('/:id', (req, res) => {
  const accountId = req.params.id
  db('accounts')
    .where({ id: accountId })
    .select('*')
    .then(account => {
      if (account) {
        res.status(200).json({ data: account })
      } else {
        res.status(404).json({ message: 'Account with that ID not found' })
      }
    })
    .catch(err => {
      console.log(err)
      req.status(500).json({ errorMessage: err.message })
    })
})

router.post('/:id', (req, res) => {})

router.put('/:id', (req, res) => {})

router.delete('/:id', (req, res) => {})

module.exports = router
