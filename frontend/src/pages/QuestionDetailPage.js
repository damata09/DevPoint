import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import AnswerForm from '../components/AnswerForm';
import { useAuth } from '../context/AuthContext';

const QuestionDetailPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/questions/${id}`);
        setQuestion(res.data.data.question);
        setAnswers(res.data.data.answers);
      } catch (err) {
        setError('Erro ao carregar pergunta');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleNewAnswer = (newAnswer) => {
    setAnswers([newAnswer, ...answers]);
  };

  const handleAcceptAnswer = async (answerId) => {
    try {
      await axios.put(`http://localhost:5000/api/answers/${answerId}/accept`);
      setAnswers(answers.map(ans => 
        ans._id === answerId ? { ...ans, isAccepted: true } : ans
      ));
    } catch (err) {
      setError('Erro ao aceitar resposta');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">{question.title}</h2>
          <p className="card-text">{question.description}</p>
          {question.codeSnippet && (
            <pre className="bg-light p-3 rounded">
              <code>{question.codeSnippet}</code>
            </pre>
          )}
          <div className="text-muted small">
            Postado por: {question.author.username}
          </div>
        </div>
      </div>

      <h3>Respostas ({answers.length})</h3>

      {user && (
        <div className="mb-4">
          <AnswerForm questionId={id} onNewAnswer={handleNewAnswer} />
        </div>
      )}

      {answers.length === 0 ? (
        <div className="alert alert-info">Nenhuma resposta ainda. Seja o primeiro a responder!</div>
      ) : (
        answers.map(answer => (
          <div key={answer._id} className={`card mb-3 ${answer.isAccepted ? 'border-success' : ''}`}>
            <div className={`card-body ${answer.isAccepted ? 'bg-light' : ''}`}>
              <p className="card-text">{answer.content}</p>
              {answer.codeSnippet && (
                <pre className="bg-light p-3 rounded">
                  <code>{answer.codeSnippet}</code>
                </pre>
              )}
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Respondido por: {answer.author.username}
                </small>
                <div>
                  {user && user._id === question.author._id && !answer.isAccepted && (
                    <button 
                      onClick={() => handleAcceptAnswer(answer._id)}
                      className="btn btn-sm btn-success me-2"
                    >
                      Aceitar Resposta
                    </button>
                  )}
                  {answer.isAccepted && (
                    <span className="badge bg-success">
                      <i className="bi bi-check-circle"></i> Resposta Aceita
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionDetailPage;