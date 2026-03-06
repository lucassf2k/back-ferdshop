import type { Review, ReviewProps } from '../../domain/product/review';
import type { Repository } from './repository';

export type ReviewRepositories = Repository<ReviewProps, Review, string>;
