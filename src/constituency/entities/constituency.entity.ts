import { ElectionCommittee } from 'src/election-committee/entities/election-committee.entity';
import { VotingType } from 'src/types/voting-type.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Constituency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  constituencyNumber: number;

  @Column()
  name: string;

  @Column()
  votingType: VotingType;

  @ManyToMany(
    () => ElectionCommittee,
    (electionCommittee) => electionCommittee.constituencies,
  )
  electionCommittees: ElectionCommittee[];
}
