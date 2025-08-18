import { useState } from 'react';
import './Commandes.css';

const Commandes: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    comments: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.street || !formData.city || !formData.postalCode) {
      setMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setMessage('Veuillez entrer un email valide.');
      return;
    }
    setMessage('Commande soumise avec succès !');
    // Ici, tu pourrais ajouter une API call ou une action (ex. envoyer à un backend)
    setFormData({ name: '', email: '', street: '', city: '', postalCode: '', comments: '' });
  };

  return (
    <div className="commandes-container">
      <h2>Formulaire de Commande</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="street">Rue *</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ville *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Code Postal *</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Commentaires (optionnel)</label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">Soumettre la Commande</button>
      </form>
      {message && <p className={`message ${message.includes('succès') ? 'success' : ''}`}>{message}</p>}
    </div>
  );
};

export default Commandes;