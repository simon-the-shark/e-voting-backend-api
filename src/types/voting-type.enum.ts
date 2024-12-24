import { z } from 'zod';

export enum VotingType {
  CommuneHead = 'wojt',
  Mayor = 'burmistrz',
  CityMayor = 'prezydent-miasta',
  President = 'prezydent',
  MunicipalCouncil = 'rada-gminy',
  CityCouncil = 'rada-miasta',
  UrbanDistrictCouncil = 'rada-powiatu',
  DistrictCouncil = 'rada-dzielnicy',
  RegionalAssembly = 'sejmik-wojewodztwa',
}

export const VotingTypeZod = z.nativeEnum(VotingType).or(
  z
    .string()
    .startsWith("'")
    .endsWith("'")
    .transform((value) => value.slice(1, -1))
    .pipe(z.nativeEnum(VotingType)),
);
