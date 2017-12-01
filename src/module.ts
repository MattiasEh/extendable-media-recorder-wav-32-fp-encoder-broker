import 'core-js/es7/reflect'; // tslint:disable-line:ordered-imports
import { ReflectiveInjector } from '@angular/core';
import { WavEncoderFactory } from './factories/wav-encoder';
import { WavRecorderFactory } from './factories/wav-recorder';
import { worker } from './providers/worker';
import { recordingIds } from './providers/recording-ids';
import { unrespondedRequests } from './providers/unresponded-requests';

export const load = (url: string) => {
    const injector = ReflectiveInjector.resolveAndCreate([
        { provide: recordingIds, useValue: new Set<number>() },
        { provide: unrespondedRequests, useValue: new Set<number>() },
        WavEncoderFactory,
        WavRecorderFactory,
        { provide: worker, useValue: new Worker(url) }
    ]);

    const wavEncoderFactory = injector.get(WavEncoderFactory);

    return wavEncoderFactory.create();
};
