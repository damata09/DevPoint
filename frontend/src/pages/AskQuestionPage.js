import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AskQuestionPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/questions', {
        title,
        description,
        codeSnippet,
        tags: tags.split(',').map(tag => tag.trim())
      });

      navigate(`/questions/${res.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar pergunta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4">Fazer Pergunta</h1>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Qual é sua dúvida de programação?"
              />
              <div className="form-text">
                Seja específico e imagine que está fazendo a pergunta para outra pessoa
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descrição
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Descreva seu problema com detalhes..."
              ></textarea>
              <div className="form-text">
                Inclua toda a informação que alguém precisaria para responder sua pergunta
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="codeSnippet" className="form-label">
                Trecho de Código (opcional)
              </label>
              <textarea
                className="form-control font-monospace"
                id="codeSnippet"
                rows="5"
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="Se aplicável, inclua o código relacionado ao problema..."
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags (opcional)
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="javascript, react, node (separadas por vírgula)"
              />
              <div className="form-text">
                Adicione tags para ajudar outros a encontrar sua pergunta
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Enviar Pergunta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPage;