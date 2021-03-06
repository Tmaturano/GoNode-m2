const { Category, Snippet } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {
      const { categoryId } = req.params;

      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: categoryId,
      });

      req.flash('success', 'Snippet criado com sucesso!');
      return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async update(req, res, next) {
    try {
      const snippet = await Snippet.findById(req.params.id);
      await snippet.update(req.body);

      req.flash('success', 'Snippet atualizado com sucesso!');
      return res.redirect(`/app/categories/${req.params.categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await Snippet.destroy({ where: { id: req.params.id } });

      req.flash('success', 'Snippet deletado com sucesso!');
      return res.redirect(`/app/categories/${req.params.categoryId}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const { categoryId, id } = req.params;

      const categories = await Category.findAll({
        include: [Snippet],
        where: {
          UserId: req.session.user.id,
        },
      });

      const snippets = await Snippet.findAll({
        where: { CategoryId: categoryId },
      });

      const snippet = await Snippet.findById(id);

      return res.render('snippets/show', {
        activeCategory: categoryId,
        currentSnippet: snippet,
        categories,
        snippets,
      });
    } catch (err) {
      return next(err);
    }
  },
};
