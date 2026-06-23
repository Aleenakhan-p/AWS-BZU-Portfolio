const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAllPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio,
  getAllPartners, getPartnerById, getPartnersByFocus, createPartner, updatePartner, deletePartner,
  getAllUniversities, getUniversityById, searchUniversities, createUniversity, updateUniversity, deleteUniversity,
} = require('../controllers/collaborationController');

// ─── /collaborations/portfolios ───────────────────────────────────────────────
router.get('/portfolios', getAllPortfolios);
router.get('/portfolios/:id', getPortfolioById);
router.post('/portfolios', protect, createPortfolio);
router.put('/portfolios/:id', protect, updatePortfolio);
router.delete('/portfolios/:id', protect, deletePortfolio);

// ─── /collaborations/partners ─────────────────────────────────────────────────
// focus/:focus must come before /:id
router.get('/partners/focus/:focus', getPartnersByFocus);
router.get('/partners', getAllPartners);
router.get('/partners/:id', getPartnerById);
router.post('/partners', protect, createPartner);
router.put('/partners/:id', protect, updatePartner);
router.delete('/partners/:id', protect, deletePartner);

// ─── /collaborations/universities ────────────────────────────────────────────
// search must come before /:id
router.get('/universities/search', searchUniversities);
router.get('/universities', getAllUniversities);
router.get('/universities/:id', getUniversityById);
router.post('/universities', protect, createUniversity);
router.put('/universities/:id', protect, updateUniversity);
router.delete('/universities/:id', protect, deleteUniversity);

module.exports = router;
