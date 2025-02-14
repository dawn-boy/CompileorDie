# 🕵️‍♂️ Erebor: A Social Deduction Game for Developers

Are you a **Developer**, fixing broken code and hunting for Hackers? Or are you a **Hacker**, secretly sabotaging the system? Play smart, deceive wisely, and survive until the end!

## 📜 Table of Contents
- [About the Game](#about-the-game)
- [How to Play](#how-to-play)
- [Roles](#roles)
- [Game Phases](#game-phases)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Routes](#routes)
- [License](#license)

## 🎮 About the Game
Erebor is a **web-based social deduction game** where players take on the roles of Developers or Hackers. The Developers must identify and eliminate the Hackers before the system crashes. With special roles like **Debugger** and **Cyber Guardian**, each game is a strategic battle of deception and deduction!

## 🕹 How to Play
1. Players are randomly assigned roles at the start of the game.
2. The game progresses in **three phases**:
   - **Coding & Sabotage**: Players answer coding questions while the Hacker sabotages.
   - **Actions & Investigations**: Debugger fixes corrupted code, Cyber Guardian investigates.
   - **Discussion & Voting**: Players discuss, vote, and eliminate suspected Hackers.
3. The game ends when:
   - The **Hackers** outnumber the **Developers**.
   - The **Hacker is eliminated** before taking over.

## 🎭 Roles

| Role           | Abilities & Goals |  
|---------------|------------------|  
| **Hacker** 🦠  | Sabotages the system by corrupting code. Wins if the Developers fail to find them. |  
| **Developer** 👨‍💻 | Fixes code and eliminates Hackers before they take over. |  
| **Debugger** 🛠 | Can repair corrupted code once per round. |  
| **Cyber Guardian** 🕵️‍♂️ | Investigates one player per round to detect Hackers. |  

## 🔄 Game Phases

### **1️⃣ Coding & Sabotage**
- Players answer a coding question.
- The **Hacker** selects a player to sabotage.

### **2️⃣ Actions & Investigations**
- **Debugger** attempts to fix corrupted code.
- **Cyber Guardian** investigates one player.
- **Developers** continue their coding tasks.

### **3️⃣ Discussion & Voting**
- Players discuss their suspicions.
- Everyone votes to eliminate a player.
- If a **Hacker is voted out, the Developers win**. If not, the cycle continues.

## 🛠 Tech Stack
- **Frontend**: HTML, CSS, JavaScript, EJS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: Sessions & Player ID Management

## 🚀 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/erebor.git  
   cd erebor  
   ```  
2. **Install dependencies**
   ```sh
   npm install  
   ```  
3. **Start the server**
   ```sh
   nodemon  
   ```  
4. **Open the game in your browser**
   ```
   http://localhost:8000  
   ```

## 🌐 API & Routes

| Route        | Purpose |  
|-------------|--------|  
| `/`         | Game description & login |  
| `/login`    | Player authentication |  
| `/lobby`    | Assigns roles & prepares game start |  
| `/question` | Players answer coding questions |  
| `/hacker`   | Hacker performs sabotage |  
| `/debugger` | Debugger attempts to fix code |  
| `/cyberGuardian` | Cyber Guardian investigates players |  
| `/endgame`  | Game results & winner announcement |  

## 🤝 Contributing
Want to improve Erebor? Contributions are welcome! Simply fork the repo, create a branch, and submit a PR.

## 🎮 Ready to Play?
Join the battle between **Hackers and Developers** now! Clone the repo and start coding! 💻🔥

