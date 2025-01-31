import { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import './styles/BotStyles.css'; // Import CSS file

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bots data from API on component mount
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch('https://bots-si0g.onrender.com/bots');
        const data = await response.json();
        setBots(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bots:', error);
        setIsLoading(false);
      }
    };
    
    fetchBots();
  }, []);

  // Add bot to army if not already enlisted
  const enlistBot = (bot) => {
    if (!army.some(b => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  // Remove bot from army
  const releaseBot = (botId) => {
    setArmy(army.filter(bot => bot.id !== botId));
  };

  // Permanently delete bot from backend and army
  const dischargeBot = async (botId) => {
    try {
      await fetch(`https://bots-si0g.onrender.com/bots/${botId}`, {
        method: 'DELETE',
      });
      
      setBots(bots.filter(bot => bot.id !== botId));
      setArmy(army.filter(bot => bot.id !== botId));
    } catch (error) {
      console.error('Error discharging bot:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">BOT BATTLR</h1>
      </header>

      <YourBotArmy 
        bots={army} 
        onRelease={releaseBot} 
        onDischarge={dischargeBot} 
      />

      {isLoading ? (
        <div className="loading-spinner" />
      ) : (
        <BotCollection 
          bots={bots} 
          onEnlist={enlistBot} 
        />
      )}
    </div>
  );
}

export default App;