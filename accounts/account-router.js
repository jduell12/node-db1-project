const express = require('express')
const db = require('../data/dbConfig')
const router = express.Router()

router.get('/', (req, res) => {
  const queryString = req.body

  db('accounts')
    .select('*')
    .limit(queryString.limit)
    .orderBy(queryString.sortby, queryString.sortdir)
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

router.post('/:id', (req, res) => {
  const account = req.body
  const accountId = req.params.id

  db('accounts')
    .insert(account)
    .returning('account')
    .then(accounts => {
      res.status(201).json({ inserted: accounts })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: err.message })
    })
})

router.put('/:id', (req, res) => {
  const accountId = req.params.id
  const changes = req.body

  db('accounts')
    .where({ id: accountId })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'Updated account successfully' })
      } else {
        res.status(404).json({ message: 'Account with that ID not found' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: err.message })
    })
})

router.delete('/:id', (req, res) => {
  const accountId = req.params.id

  db('accounts')
    .where({ id: accountId })
    .delete()
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'Account deleted successfully' })
      } else {
        res.status(404).json({ message: 'Account with that ID not found' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: err.message })
    })
})

module.exports = router
