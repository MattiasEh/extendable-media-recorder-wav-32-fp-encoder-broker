import { WavRecorder, WavRecorderFactory } from './wav-recorder';
import { Inject, Injectable } from '@angular/core';

export class WavEncoder {

    private _wavRecorderFactory;

    constructor ({ wavRecorderFactory }) {
        this._wavRecorderFactory = wavRecorderFactory;
    }

    public isTypeSupported (type): boolean {
        if (type === 'audio/wav') {
            return true;
        }

        return false;
    }

    public start (mediaStream): WavRecorder {
        return this._wavRecorderFactory.create({ mediaStream });
    }

}

@Injectable()
export class WavEncoderFactory {

    private _wavRecorderFactory;

    constructor (@Inject(WavRecorderFactory) wavRecorderFactory) {
        this._wavRecorderFactory = wavRecorderFactory;
    }

    public create () {
        return new WavEncoder({ wavRecorderFactory: this._wavRecorderFactory });
    }

}
