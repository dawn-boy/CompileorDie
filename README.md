# 🕵️‍♂️ CompileorDie: A Social Deduction Game for Developers

Are you a **Developer**, fixing broken code and hunting for Hackers? Or are you a **Hacker**, secretly sabotaging the system? Play smart, deceive wisely, and survive until the end!

## 📜 Table of Contents
- [About the Game](#about-the-game)
- [How to Play](#how-to-play)
- [Roles](#roles)
- [Game Phases](#game-phases)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API & Routes](#api-&-routes)
- [Contributing](#contributing)

## 🎮 About the Game
CompileorDie is a **web-based social deduction game** where players take on the roles of Developers or Hackers. The Developers must identify and eliminate the Hackers before the system crashes. With special roles like **Debugger** and **Cyber Guardian**, each game is a strategic battle of deception and deduction!

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
   git clone https://github.com/your-username/CompileorDie.git  
   cd CompileorDie  
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

## Flow logic of *Legacy* V1

This is the logic of our Telegram bot that we created for the MindKraft25 event. It hosted 75+ participants and now it rests here in peace. *It is soon to be succeded by his big brother!*

### Round 0 - Entrypoint
![round-0](https://github.com/user-attachments/assets/6a44fd2d-d5db-4330-800a-1474c1f0c29b)

### Round 1 
![round-1](https://github.com/user-attachments/assets/636509cc-f34f-4d4a-8a93-073acc19248a)

### Round 2 
![round-2](https://github.com/user-attachments/assets/7661c249-1480-4d63-8406-484d109f437b)

### Round 3 
![round-3](https://github.com/user-attachments/assets/dd28a9cf-dc6a-4b9d-a443-cd398c1e7806)

### Round 4 
![round-4](https://github.com/user-attachments/assets/2464c368-84fe-447b-bfbe-c9adb146625e)

### Round 5 
![round-5](https://github.com/user-attachments/assets/e30aa2bb-10fc-407a-8364-65ae4ce9c4d9)


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
Want to improve CompileorDie? Contributions are welcome! Simply fork the repo, create a branch, and submit a PR.

## 🎮 Ready to Play?
Join the battle between **Hackers and Developers** now! Clone the repo and start coding! 💻🔥

