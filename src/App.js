import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    ids: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Ensure the data matches what your backend expects
  const dataToSend = {
    id: formData.ids,   // Change from 'ids' to 'id'
    name: formData.name,
    email: formData.mail // Change from 'mail' to 'email'
  };

  try {
    const response = await fetch('https://aaki9sqim1.execute-api.us-east-1.amazonaws.com/dev/receive', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    });

    if (response.ok) {
      alert("✅ Submission Successful!");
      setFormData({ name: '', mail: '', ids: '' }); // Reset form
    } else {
      alert("❌ Submission Failed. Please try again.");
    }
  } catch (error) {
    console.error("Submission Error:", error);
    alert("🚫 An error occurred. Please check your network or console.");
  }
};

  return (
    <div className="container">
      <header className="header">
        <h1>Tickup Submission Form</h1>
      </header>
      <main className="main-content">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label>IDs:</label>
            <input
              type="text"
              name="ids"
              value={formData.ids}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Tickup, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
