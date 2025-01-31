import { useState, useEffect } from 'react';
import BotCollection from './components/BotCollection';
import YourBotArmy from './components/YourBotArmy';
import './styles/BotStyles.css'; // Import CSS file

function App() {
  const [bots, setBots] = useState([]);
  const [army, setArmy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCountdown, setLoadingCountdown] = useState(5); // Countdown timer

  useEffect(() => {
    // Countdown effect
    const countdownInterval = setInterval(() => {
      setLoadingCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const fetchBots = async () => {
      try {
        const response = await fetch('https://bots-si0g.onrender.com/bots');
        const data = await response.json();
        setBots(data);
        setIsLoading(false);
        clearInterval(countdownInterval); // Stop countdown when data loads
      } catch (error) {
        console.error('Error fetching bots:', error);
        setIsLoading(false);
        clearInterval(countdownInterval);
      }
    };

    fetchBots();

    return () => clearInterval(countdownInterval); // Cleanup on unmount
  }, []);

  const enlistBot = (bot) => {
    if (!army.some(b => b.id === bot.id)) {
      setArmy([...army, bot]);
    }
  };

  const releaseBot = (botId) => {
    setArmy(army.filter(bot => bot.id !== botId));
  };

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
        <div className="loading-container">
          <p>Loading bots... {loadingCountdown > 0 ? `${loadingCountdown}s remaining` : 'Almost there!'}</p>
          <p>This might take a while!</p>
          <div className="loading-spinner" />
        </div>
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
