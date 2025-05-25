import React, { useState } from 'react';
import axios from 'axios';

const AnswerForm = ({ questionId, onNewAnswer }) => {
  const [content, setContent] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/answers', {
        question: questionId,
        content,
        codeSnippet
      });

      onNewAnswer(res.data.data);
      setContent('');
      setCodeSnippet('');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao enviar resposta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Sua Resposta</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Explique sua resposta detalhadamente..."
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Código (opcional)</label>
            <textarea
              className="form-control"
              rows="4"
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              placeholder="Se aplicável, inclua um trecho de código..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Resposta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnswerForm;