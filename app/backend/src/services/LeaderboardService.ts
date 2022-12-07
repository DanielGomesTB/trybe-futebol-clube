import { IMatch } from '../Interfaces/IMatch';
import Matches from '../database/models/Matches';
import Team from '../database/models/Team';
import { ITeam } from '../Interfaces/ITeam';
import { IStatus } from '../Interfaces/IStatus';

export default class LeaderboardService {
  private _matches: IMatch[][];
  private _leaderboard: IStatus[];
  constructor(
    private _matchesModel = Matches,
    private _teamsModel = Team,
  ) {
    this._matches = [];
    this._leaderboard = [];
  }

  // junta os gols
  forEachStats = async (matches: IMatch[]) => {
    const inicialValue = { goalsFavor: 0, goalsOwn: 0, draws: 0, losses: 0, victories: 0 };
    matches.forEach((match) => {
      inicialValue.goalsFavor += match.homeTeamGoals;
      inicialValue.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals < match.awayTeamGoals) {
        inicialValue.losses += 1;
      }
      if (match.homeTeamGoals > match.awayTeamGoals) {
        inicialValue.victories += 1;
      }
      if (match.homeTeamGoals === match.awayTeamGoals) {
        inicialValue.draws += 1;
      }
    });
    const { goalsFavor, goalsOwn, draws, losses, victories } = inicialValue;
    const goalsBalance = inicialValue.goalsFavor - inicialValue.goalsOwn;
    return { goalsFavor, goalsOwn, goalsBalance, draws, losses, victories };
  };

  // preenche objeto
  fill = async (matches: IMatch[]) => {
    const { goalsFavor, goalsOwn, goalsBalance, draws, losses, victories } = await this
      .forEachStats(matches);
    const totalPoints = (draws + (victories * 3));
    const efficiency = ((totalPoints / (matches.length * 3)) * 100);
    const string = efficiency.toFixed(2);
    const obj = {
      name: matches[0].teamHome?.teamName,
      totalPoints,
      totalGames: matches.length,
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: losses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: string.toString(),
    };
    this._leaderboard.push(obj as IStatus);
  };

  // mandar array com objetos das partidas de cada time
  eachMatches = async (finding: IMatch[][]) => {
    finding.forEach((matches) => {
      this.fill(matches as IMatch[]);
    });
  };

  // Criar array de arrays com times agrupados
  teamGrouping = async (matches: Array<IMatch>, teams: Array<ITeam>) => {
    const finding = teams.map((team) => matches
      .filter((match) => team.teamName === match.teamHome?.teamName));
    this.eachMatches(finding);
  };

  /// ///////////////////////////////////////////////////////////////////////////////////////
  // Pegar times
  getTeams = async () => {
    const data = await this._teamsModel.findAll();
    return data;
  };

  // Pegar partidas
  getFinishedMatches = async () => {
    const data = await this._matchesModel.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome' },
      ],

    });
    return data;
  };
  /// ///////////////////////////////////////////////////////////////////////////////////////

  // parte do sort feita com ajud de Eliel e Marcelo
  getLeaderboard = async () => {
    const matches = await this.getFinishedMatches();
    const teams = await this.getTeams();
    this._leaderboard = [];
    await this.teamGrouping(matches, teams);
    this._leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
        || b.totalVictories - a.totalVictories
        || b.goalsBalance - a.goalsBalance
        || b.goalsFavor - a.goalsFavor
        || a.goalsOwn - b.goalsOwn);
    return { status: 200, message: this._leaderboard };
  };
}
