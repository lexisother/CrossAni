import { PartialTransition } from "crossani";
import { Accessor, createEffect, Setter } from "solid-js";

export default (el: Element, argsAccessor: Accessor<CrossAniArgs>) => {
  const args = argsAccessor();
  const trigger = Array.isArray(args) ? args[0] : args;
  const stateOut = Array.isArray(args) ? args[1] : undefined;

  const queue = [] as (string | PartialTransition)[];

  createEffect(() => {
    // @ts-expect-error el.transitions no exist wew
    if (typeof trigger() === "string" && !el.transitions[trigger()]) return;

    if (queue.length === 0) stateOut?.(() => trigger());

    queue.push(trigger());

    // @ts-expect-error *french bread*
    el.doTransition(trigger()).then(() => {
      queue.shift();
      stateOut?.(() => queue[0]);
    });
  });
};

type CrossAniArgs =
  | Accessor<string | PartialTransition>
  | [
      triggerSignal: Accessor<string | PartialTransition>,
      stateSignalOut: Setter<string | PartialTransition | undefined>
    ];

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      crossani: CrossAniArgs;
    }
  }
}
