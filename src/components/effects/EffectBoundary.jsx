import { Component } from 'react'

/**
 * Decorative effects must never break a page. If an effect chunk fails to load (e.g. a new
 * deploy replaced it while the tab was open) or throws, show the static fallback instead.
 */
export default class EffectBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children
  }
}
