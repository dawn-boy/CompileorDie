class Player{
		constructor(name,role,team){
				this.name = name;
				this.role = role;
				this.team = team;
				this.code = [];
				this.isReady = false;
				this.compilation = false;
		}
}

class Team{
		constructor(phase){
				this.members = [];
				this.phase = phase;
		}
}
