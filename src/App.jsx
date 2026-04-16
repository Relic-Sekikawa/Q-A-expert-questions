import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  const [questions, setQuestions] = useState([])
  const [isDoctor, setIsDoctor] = useState(false)

  const addQuestion = (question, photo) => {
    const newQuestion = {
      id: Date.now(),
      question,
      photo,
      answers: []
    }
    setQuestions([...questions, newQuestion])
  }

  const addAnswer = (questionId, answer) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, answers: [...q.answers, answer] } : q
    ))
  }

  return (
    <Router>
      <div className="app">
        <header>
          <h1>歯の専門家Q&A</h1>
          <button onClick={() => setIsDoctor(!isDoctor)}>
            {isDoctor ? '一般ユーザー' : '医者モード'}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Home questions={questions} onSubmit={addQuestion} />} />
          <Route path="/question/:id" element={<QuestionDetail questions={questions} isDoctor={isDoctor} onAnswer={addAnswer} />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home({ questions, onSubmit }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <QuestionForm onSubmit={onSubmit} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="質問を検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <QuestionList questions={filteredQuestions} />
    </>
  )
}

function QuestionList({ questions }) {
  return (
    <div className="question-list">
      <h2>質問一覧</h2>
      {questions.map(q => (
        <div key={q.id} className="question-item">
          <p><strong>質問:</strong> {q.question}</p>
          {q.photo && <img src={q.photo} alt="Question photo" className="question-photo" />}
          <p>回答数: {q.answers.length}</p>
          <Link to={`/question/${q.id}`}>詳細を見る</Link>
        </div>
      ))}
    </div>
  )
}

function QuestionDetail({ questions, isDoctor, onAnswer }) {
  const questionId = window.location.pathname.split('/').pop()
  const question = questions.find(q => q.id == questionId)

  if (!question) return <p>質問が見つかりません</p>

  return (
    <div className="question-detail">
      <h2>質問詳細</h2>
      <p><strong>質問:</strong> {question.question}</p>
      {question.photo && <img src={question.photo} alt="Question photo" className="question-photo" />}
      <div className="answers">
        <h3>回答</h3>
        {question.answers.map((ans, idx) => (
          <p key={idx}><strong>回答:</strong> {ans}</p>
        ))}
      </div>
      {isDoctor && <AnswerForm questionId={question.id} onAnswer={onAnswer} />}
      <Link to="/">戻る</Link>
    </div>
  )
}

function QuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState('')
  const [photo, setPhoto] = useState(null)

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPhoto(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (question.trim()) {
      onSubmit(question, photo)
      setQuestion('')
      setPhoto(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>質問を投稿</h2>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="歯に関する質問を入力してください"
        required
      />
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      {photo && <img src={photo} alt="Preview" className="preview" />}
      <button type="submit">送信</button>
    </form>
  )
}

function AnswerForm({ questionId, onAnswer }) {
  const [answer, setAnswer] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (answer.trim()) {
      onAnswer(questionId, answer)
      setAnswer('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="answer-form">
      <h3>回答を投稿</h3>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="回答を入力してください"
        required
      />
      <button type="submit">回答送信</button>
    </form>
  )
}

export default App
